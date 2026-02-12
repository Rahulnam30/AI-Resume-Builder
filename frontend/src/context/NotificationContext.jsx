import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "template_approved",
            title: "Template Approved",
            user: "John Doe",
            description: "Professional Resume Template has been approved and published",
            time: "2 min ago",
            isUnread: true,
            category: "today",
            priority: "normal"
        },
        {
            id: 2,
            type: "payment_received",
            title: "Payment Received",
            user: "Jane Smith",
            description: "Premium annual subscription - $99.99",
            time: "15 min ago",
            isUnread: true,
            category: "today",
            priority: "normal"
        },
        {
            id: 3,
            type: "new_user",
            title: "New User Registered",
            user: "Sarah Wilson",
            description: "New account created via Google OAuth",
            time: "1 hr ago",
            isUnread: true,
            category: "today",
            priority: "normal"
        },
        {
            id: 4,
            type: "template_submitted",
            title: "Template Pending Review",
            user: "Alex Thompson",
            description: "Creative Designer Template awaiting approval",
            time: "2 hrs ago",
            isUnread: true,
            category: "today",
            priority: "high"
        },
        {
            id: 5,
            type: "security_alert",
            title: "Security Alert",
            user: "System",
            description: "Multiple failed login attempts detected from IP 192.168.1.105",
            time: "3 hrs ago",
            isUnread: true,
            category: "today",
            priority: "urgent"
        },
        {
            id: 6,
            type: "premium_activated",
            title: "Premium Plan Activated",
            user: "Mike Chen",
            description: "Upgraded from Basic to Premium plan",
            time: "yesterday",
            isUnread: false,
            category: "older",
            priority: "normal"
        },
        {
            id: 7,
            type: "subscription_cancelled",
            title: "Subscription Cancelled",
            user: "Emma Davis",
            description: "Premium subscription cancelled - reason: switching plans",
            time: "2 days ago",
            isUnread: false,
            category: "older",
            priority: "normal"
        },
        {
            id: 8,
            type: "system_alert",
            title: "System Maintenance",
            user: "System",
            description: "Scheduled maintenance completed successfully",
            time: "3 days ago",
            isUnread: false,
            category: "older",
            priority: "low"
        }
    ]);

    const unreadCount = notifications.filter(n => n.isUnread).length;

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, isUnread: false } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
