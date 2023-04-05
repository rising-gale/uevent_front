import React, { useState } from "react";
import TabNavItem from "./TabNavItem"
import TabContent from "./TabContent";
import '../styles/TabsStyles.css'
import ProfileTab from "./allTabs/ProfileTab";
import MyTicketsTab from "./allTabs/MyTicketsTab";
import MyFollowedCompaniesTab from "./allTabs/MyFollowedCompaniesTab";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div 
            // className="Tabs"
            className="flex flex-row w-full min-w-[400px] bg-dark-purple py-[1rem] px-[2rem] text-beige space-x-4"
        >
            <ul 
                className="nav"
                // className="flex flex-col w-1/5 h-fit items-center border-solid border-[1px] border-beige rounded-[2rem] pl-0"
            >
                <TabNavItem title="PROFILE" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title="MY TICKETS" id="myTickets" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title="MY FOLLOWED COMPANIES" id="myFollowedCompanies" activeTab={activeTab} setActiveTab={setActiveTab} />
            </ul>

            <div 
                // className="outlet"
                className="w-4/5"
            >
                <TabContent id="profile" activeTab={activeTab}>
                    <ProfileTab/>
                </TabContent>
                <TabContent id="myTickets" activeTab={activeTab}>
                    <MyTicketsTab/>
                </TabContent>
                <TabContent id="myFollowedCompanies" activeTab={activeTab}>
                    <MyFollowedCompaniesTab/>
                </TabContent>
            </div>
        </div>
    );
};

export default Tabs;