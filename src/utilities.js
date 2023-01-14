const UTIL = {
    // Calc elapsed time
    getElapsedTime: (startTime) => {
        let endTime = new Date();

        let timeDiff = endTime.getTime() - startTime.getTime();

        timeDiff = timeDiff / 1000;
        let seconds = Math.floor(timeDiff % 60);
        let secondsAsString = seconds < 10 ? "0" + seconds : seconds;

        timeDiff = Math.floor(timeDiff / 60);
        let minutes = timeDiff % 60;
        let minutesAsString = minutes < 10 ? "0" + minutes : minutes;

        timeDiff = Math.floor(timeDiff / 60);
        let hours = timeDiff % 24;

        timeDiff = Math.floor(timeDiff / 24);
        let days = timeDiff;
        let totalHours = hours + (days * 24);
        let totalHoursAsString = totalHours < 10 ? "0" + totalHours : totalHours;

        return totalHoursAsString + ":" + minutesAsString + ":" + secondsAsString;
    },
};

export default UTIL;
