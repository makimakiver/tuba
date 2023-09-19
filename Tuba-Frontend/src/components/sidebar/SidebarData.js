import { AccountBox, ChatBubbleRounded, GroupRounded, Home, Settings, SmartToy, TrendingUp } from '@mui/icons-material'
import React from 'react'

export const SidebarData = [
    {
        title: "AIconversation",
        icons: <SmartToy />,
        path: "/",
        cName: "nav-text",
    },
    {
        title: "Chat",
        icons: <ChatBubbleRounded />,
        path: "/"
    },
    {
        title: "Home",
        icons: <Home />,
        path: "/",
        cName: "nav-text",
    },
    {
        title: "Settings",
        icons: <Settings />,
        path: "/",
        cName: "nav-text",
    },
    {
        title: "Profile",
        icons: <AccountBox />,
        path: "/",
        cName: "nav-text",
    },
    {
        title: "Teams",
        icons: <GroupRounded />,
        path: "/",
        cName: "nav-text",
    },
    {
        title: "Trends",
        icons: <TrendingUp />,
        path: "/",
        cName: "nav-text",
    },
]