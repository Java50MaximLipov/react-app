import React, { useState, useEffect } from "react";
import timeZones from "../time-zones";

type Props = {
    cityCountry: string;
}
export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        // backgroundColor: "lightblue",
        fontSize: "2em"
    };
    const [time, setTime] = useState<Date>(new Date());
    function tic() {
        setTime(new Date());
    }
    useEffect(() => {
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeZoneIndex = timeZones.findIndex(
        (index) => (JSON.stringify(index)).includes(cityCountry)
    );
    const finalTimeZone = timeZoneIndex !== -1 ? timeZones[timeZoneIndex].name : undefined;

    return <div className="box">
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString("en-GB", { timeZone: finalTimeZone})}</p>
    </div>
}