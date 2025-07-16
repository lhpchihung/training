import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthenticatedContext } from '../../../shared/Authenticated';

interface MenuItem {
    name: string;
    link: (id: string) => string;
    icon: string;
    role: string;
}

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(AuthenticatedContext);

    const location = useLocation();
    const isActive = (link: string) => location.pathname === link;

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    if (!user?.id || !user?.role) return null;

    const id = user.id;

    const menuItems: MenuItem[] = [
        {
            name: 'Submissions',
            link: () => '/pages/admin/submissions',
            icon: '/icons/document-text.svg',
            role: 'admin'
        },
        {
            name: 'Profile',
            link: (id) => `/pages/user/${id}/profile`,
            icon: '/icons/person-square.svg',
            role: 'user'
        },
        {
            name: 'PI',
            link: (id) => `/pages/user/${id}/pi`,
            icon: '/icons/person-button.svg',
            role: 'user'
        },
        {
            name: 'KYC',
            link: (id) => `/pages/user/${id}/kyc`,
            icon: '/icons/health-insurance.svg',
            role: 'user'
        },
        {
            name: 'Submission',
            link: (id) => `/pages/user/${id}/submissions`,
            icon: '/icons/document-text.svg',
            role: 'user'
        }
    ];

    const filteredMenuItems = menuItems.filter((item) => item.role === user.role);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-transparent lg:hidden"
                aria-label="Toggle Sidebar"
            >
                <img
                    src={isSidebarOpen ? '/icons/close.svg' : '/icons/menu.svg'}
                    alt={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
                    className="h-6 w-6"
                />
            </button>

            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width 
                    ${
                        isSidebarOpen ? 'flex' : 'hidden'
                    } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <ul className="pb-2 space-y-2">
                                {filteredMenuItems.map((item, index) => {
                                    const linkPath = item.link(id);
                                    return (
                                        <li key={index}>
                                            <Link
                                                to={linkPath}
                                                className={`${
                                                    isActive(linkPath)
                                                        ? 'bg-blue-700 text-white'
                                                        : ''
                                                }
                                                flex items-center p-2 text-base text-gray-900 rounded-lg 
                                                hover:bg-blue-600 hover:text-white group dark:text-blue-200 dark:hover:bg-blue-700`}
                                            >
                                                <img
                                                    className="h-8 mr-3"
                                                    src={item.icon}
                                                    alt={item.name}
                                                />
                                                <span className="ml-3" sidebar-toggle-item="">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
