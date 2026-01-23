import { reactive, onMounted, watch, ref } from 'vue';
import iziToast from "izitoast";
import i18n from '../i18n';

export function useWeather() {
    // Helper for t
    const { t, locale } = i18n.global;

    const weather = reactive({
        city: t('loading'),
        text: t('music_fail'),
        temp: "",
        windDir: "",
        windScale: "",
    });

    const lastWeatherTime = ref(0);
    const updateWeather = (showToast = false) => {
        const now = Date.now();
        if (showToast && now - lastWeatherTime.value < 2000) {
             iziToast.show({
                message: "你点的太快了",
                icon: "fa-solid fa-triangle-exclamation",
                timeout: 3000, 
                progressBar: false, 
                position: 'topCenter',
                transitionIn: 'fadeInDown',
            });
            return;
        }
        if (showToast) {
            lastWeatherTime.value = now;
            iziToast.show({
                message: "天气正在更新",
                icon: "fa-solid fa-arrows-rotate fa-spin",
                timeout: 2000
            });
        }

        iziToast.settings({
            timeout: 3000, 
            progressBar: false, 
            position: 'topCenter',
            transitionIn: 'fadeInDown',
        });

        // Hardcoded keys (consider moving to config later)
        const add_id = "vcpmlmqiqnjpxwq1";
        const app_secret = "PeYnsesgkmK7qREhIFppIcsoN0ZShv3c";
        const key = "691d007d585841c09e9b41e79853ecc2";
      
        fetch(`https://www.mxnzp.com/api/ip/self?app_id=${add_id}&app_secret=${app_secret}`)
            .then(res => res.json())
            .then(data => {
                if(data.data && data.data.city) {
                    let str = data.data.city;
                    let city = str.replace(/市/g, "");
                    weather.city = city;
                    
                     fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${city}&number=1&key=${key}&lang=${locale.value}`)
                        .then(res => res.json())
                        .then(location => {
                            if(location.location && location.location.length > 0) {
                                let id = location.location[0].id;
                                fetch(`https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}&lang=${locale.value}`)
                                    .then(res => res.json())
                                    .then(wData => {
                                        if(wData.now) {
                                            weather.text = wData.now.text;
                                            weather.temp = wData.now.temp;
                                            weather.windDir = wData.now.windDir;
                                            weather.windScale = wData.now.windScale;
                                            
                                            if(showToast) {
                                                iziToast.show({
                                                    timeout: 2000,
                                                    icon: "fa-solid fa-cloud-sun",
                                                    message: "天气已更新"
                                                });
                                            }
                                        }
                                    })
                            }
                        })
                }
            })
            .catch(err => {
                console.error(err);
                if(showToast) {
                     iziToast.show({
                        message: "天气更新失败",
                        icon: "fa-solid fa-triangle-exclamation"
                    });
                }
                weather.text = "获取失败";
            });
    };

    onMounted(() => {
        updateWeather(); 
    });
    
    // Refresh weather when language changes
    watch(locale, () => {
        updateWeather(false);
    });

    return {
        weather,
        updateWeather
    };
}
