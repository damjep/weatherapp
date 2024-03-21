import axios from "axios";
import { useEffect, useState } from "react";
import "./warning.css"
import UseFloodWarning from "../fetch/fetchFloodWarning";

export const Warning = () => {
    const alertData = UseFloodWarning();

    return (
        <>
            {alertData ? (
                <>
                    <div className="warning">
                        {alertData.description ? (
                            <>
                                <svg width="126" height="112" viewBox="0 0 126 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1311 8.82971C54.1013 -2.94323 71.1386 -2.94324 78.1088 8.8297L122.701 84.1477C129.805 96.1466 121.157 111.318 107.212 111.318H18.0275C4.08325 111.318 -4.56545 96.1466 2.53858 84.1477L47.1311 8.82971ZM71.95 87.9105C71.95 92.7064 67.9468 96.5943 63.0085 96.5943C58.0703 96.5943 54.0671 92.7064 54.0671 87.9105C54.0671 83.1145 58.0703 79.2266 63.0085 79.2266C67.9468 79.2266 71.95 83.1145 71.95 87.9105ZM70.6253 18.7614H55.3918L57.3788 74.0806H68.6383L70.6253 18.7614Z" fill="white"/>
                                </svg>
                                <p>
                                    {alertData.description}
                                </p>
                            </>
                        ) : (
                            <>
                                <svg width="126" height="112" viewBox="0 0 126 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1311 8.82971C54.1013 -2.94323 71.1386 -2.94324 78.1088 8.8297L122.701 84.1477C129.805 96.1466 121.157 111.318 107.212 111.318H18.0275C4.08325 111.318 -4.56545 96.1466 2.53858 84.1477L47.1311 8.82971ZM71.95 87.9105C71.95 92.7064 67.9468 96.5943 63.0085 96.5943C58.0703 96.5943 54.0671 92.7064 54.0671 87.9105C54.0671 83.1145 58.0703 79.2266 63.0085 79.2266C67.9468 79.2266 71.95 83.1145 71.95 87.9105ZM70.6253 18.7614H55.3918L57.3788 74.0806H68.6383L70.6253 18.7614Z" fill="white"/>
                                </svg>
                                <div>
                                    <h3>Severe Weather</h3>
                                    <p>No Severe Warnings</p>
                                </div>
                                                                
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                <div>
                    <p>Loading</p>
                </div>
                
                </>
            )}
        </>
    )
}