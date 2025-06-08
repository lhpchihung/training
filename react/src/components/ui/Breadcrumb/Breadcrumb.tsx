import React from 'react';
import { BreadcrumbItem, BreadcrumbProps } from "../../../types/breadcrumb";

const Breadcrumb = React.memo(({ items }: BreadcrumbProps) => {
    return (
        <>
            <nav className="mb-4 col-span-full xl:mb-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                    {items.map((item, index) => (
                        <li key={item.label} className="inline-flex items-center">
                            {index === 0 ? (
                                <a
                                    href={item.href}
                                    className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                    </svg>
                                    {item.label}
                                </a>
                            ) : (
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <span
                                            className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                            aria-current="page"
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
            <h1 className="text-xl font-semibold sm:text-2xl text-blue-800 dark:text-white">
                {items[items.length - 1]?.label}
            </h1>
        </>
    );
});

export default Breadcrumb;
