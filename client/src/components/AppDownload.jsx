import React from "react";
import { assets } from "../assets/assets";
const ApplyDownLoad = () => {
    return (
        <div>
            <div>
                <div>
                    <h1>Download Our App</h1>
                    <div>
                        <a href="#">
                            <img src={assets.play_store} alt="" />
                        </a>
                        <a href="#">
                            <img src={assets.app_store} alt="" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
};
export default ApplyDownLoad 