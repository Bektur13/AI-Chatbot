import React, {useState} from "react";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className="">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? "Close" : "Open"}
            </button>
        </div>
    )
}