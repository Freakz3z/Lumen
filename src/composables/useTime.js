import { reactive, onMounted, onUnmounted } from 'vue';
import i18n from '../i18n';

export function useTime() {
    const timeData = reactive({
        year: 0,
        month: 0,
        day: 0,
        weekday: "",
        timeText: "00:00:00",
    });

    const capsule = reactive({
        dayPass: 0,
        dayPercent: 0,
        weekDay: 0,
        weekPercent: 0,
        monthDay: 0,
        monthPercent: 0,
        yearMonth: 0,
        yearPercent: 0
    });

    let timeInterval = null;
    let capsuleInterval = null;

    const updateTime = () => {
        const dt = new Date();
        timeData.year = dt.getFullYear();
        timeData.month = dt.getMonth() + 1;
        timeData.day = dt.getDate();
        
        // Use current locale for weekday
        const currentLocale = i18n.global.locale.value;
        timeData.weekday = dt.toLocaleDateString(currentLocale, { weekday: 'long' });
        
        const h = dt.getHours().toString().padStart(2, '0');
        const m = dt.getMinutes().toString().padStart(2, '0');
        const s = dt.getSeconds().toString().padStart(2, '0');
        timeData.timeText = `${h}:${m}:${s}`;
    };

    const updateCapsule = () => {
        let nowDate = +new Date();
        let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
        let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
        let todayPassHoursPercent = (todayPassHours / 24) * 100;
        
        capsule.dayPass = parseInt(todayPassHours);
        capsule.dayPercent = parseInt(todayPassHoursPercent);
        
        // Fix: 0 is Sunday, which should be 7 in this context usually
        let weeks = { 0: 7, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
        let weekDay = weeks[new Date().getDay()];
        let weekDayPassPercent = (weekDay / 7) * 100;
        capsule.weekDay = weekDay;
        capsule.weekPercent = parseInt(weekDayPassPercent);
        
        let year = new Date().getFullYear();
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let monthAll = new Date(year, month, 0).getDate();
        let monthPassPercent = (date / monthAll) * 100;
        
        capsule.monthDay = date;
        capsule.monthPercent = parseInt(monthPassPercent);
        
        let yearPass = (month / 12) * 100;
        capsule.yearMonth = month;
        capsule.yearPercent = parseInt(yearPass);
    };

    onMounted(() => {
        updateTime();
        updateCapsule();
        timeInterval = setInterval(updateTime, 1000);
        capsuleInterval = setInterval(updateCapsule, 1000);
    });

    onUnmounted(() => {
        clearInterval(timeInterval);
        clearInterval(capsuleInterval);
    });

    return {
        timeData,
        capsule
    };
}
