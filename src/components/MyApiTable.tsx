'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DROPDOWN_OPTIONS, TABLE_DATA, USER_DATA } from '@/utils/helper';
import { useSearchParams, useRouter } from 'next/navigation';

const MyDashboard = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    const initialSearch = searchParams.get('search') || '';
    const initialLimit = parseInt(searchParams.get('limit') || '10', 10);

    const [search, setSearch] = useState(initialSearch);
    const [entries, setEntries] = useState(initialLimit);

    const [activeRowId, setActiveRowId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [data, setData] = useState(TABLE_DATA);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        updateUrl(newPage, entries, search);
    };


    const updateUrl = (page: number, limit: number, search: string) => {
        const queryParams = new URLSearchParams();
        queryParams.set('page', page.toString());
        queryParams.set('limit', limit.toString());
        if (search) queryParams.set('search', search);

        router.push(`?${queryParams.toString()}`);
    };

    useEffect(() => {
        const storedPage = localStorage.getItem('currentPage');
        if (storedPage) {
            setCurrentPage(parseInt(storedPage, 10));
        }

        const storedData = localStorage.getItem('tableData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', entries.toString());
        if (search) params.set('search', search);
        router.push(`?${params.toString()}`);
    }, [search, entries, currentPage, router]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(data));
    }, [data]);

    const filtered = data.filter((item) =>
        item.country.toLowerCase().includes(search.trim().toLowerCase())
    );


    const totalPages = Math.ceil(filtered.length / entries);
    const paginatedData = filtered.slice((currentPage - 1) * entries, currentPage * entries);

    return (
        <div className="min-h-screen bg-[#F5F6FA] flex justify-center items-center py-14">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center sm:justify-between justify-center">
                    <div className="text-[32px] font-medium lg:pb-12 md:pb-10 pb-8">My DevOps Spaces</div>
                    <div className="flex justify-between items-center mb-6">
                        <button className="button-gradient-bg text-white px-4 py-2 rounded-xs font-medium">
                            Create a DevOps Space (1 left)
                        </button>
                    </div>
                </div>

                <div className="max-xl:overflow-auto">
                    <div className="flex w-full">
                        <aside className="sm:p-6 space-y-8 shadow-sm">
                            <div>
                                <h2 className="font-medium text-xl mb-5">User’s Guides</h2>
                                {USER_DATA.map((item: string) => (
                                    <div
                                        key={item}
                                        className="py-1 mb-3 w-[251px] cursor-pointer bg-gradient-to-r from-[#4F02FE]/10 to-[#4F02FE]/0 border-l-2 border-[#4F02FE]"
                                    >
                                        <span className="text-sm py-2 pl-3 flex gap-2">
                                            <Image src="/assets/images/svg/saved.svg" alt="saved" height={16} width={16} />
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h2 className="font-medium text-xl mb-3">Contact and Support</h2>
                                <div className="text-sm space-y-2">
                                    {['FAQs', 'Contact Support'].map((text, i) => (
                                        <div
                                            key={i}
                                            className="py-1 mb-3 w-[251px] cursor-pointer bg-gradient-to-r from-[#CD0CA7]/10 to-[#CD0CA7]/0 border-l-2 border-[#CD0CA7]"
                                        >
                                            <span className="text-sm py-2 pl-3 flex gap-2">
                                                <Image
                                                    src={`/assets/images/svg/${text === 'FAQs' ? 'faq' : 'contact'}.svg`}
                                                    alt="icon"
                                                    height={16}
                                                    width={16}
                                                />
                                                {text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-medium text-xl mb-3">Others</h2>
                                <div className="text-sm">
                                    <div className="py-1 mb-3 w-[251px] cursor-pointer bg-gradient-to-r from-[#CD0CA7]/10 to-[#CD0CA7]/0 border-l-2 border-[#CD0CA7]">
                                        <span className="text-sm py-2 pl-3 flex gap-2">
                                            <Image src="/assets/images/svg/devoops.svg" alt="devsecops" height={16} width={16} />
                                            DevSecOps Docs
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="flex flex-col w-full">
                            <main className="flex-1 py-6 bg-white shadow-sm ml-5 w-full">
                                <div className="flex flex-wrap items-center gap-4 mb-4 pl-6">
                                    <label className="flex items-center gap-2 text-sm font-medium">
                                        Show
                                        <select
                                            value={entries}
                                            onChange={(e) => {
                                                setEntries(+e.target.value);
                                                setCurrentPage(1); // Reset to page 1
                                            }}
                                            className="border text-white font-medium text-base w-[59px] gap-1 rounded px-2 py-1 outline-none bg-[#CD0CA7]"
                                        >
                                            {DROPDOWN_OPTIONS.map((n) => (
                                                <option key={n} value={n} className="font-medium text-base text-white">
                                                    {n}
                                                </option>
                                            ))}
                                        </select>
                                        Enter per page
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Find"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1); // Reset to page 1
                                        }}
                                        className="ml-auto border px-3 py-1 rounded-full placeholder:text-black text-black border-black/20 outline-none mr-4"
                                    />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse">
                                        <thead className="bg-[#4F02FE] text-white">
                                            <tr>
                                                <th className="px-4 py-2 text-left">ID</th>
                                                <th className="px-4 py-2 text-left">Country</th>
                                                <th className="px-4 py-2 text-left">Offer</th>
                                                <th className="px-4 py-2 text-left">Team</th>
                                                <th className="px-4 py-2 text-left">APP ID</th>
                                                <th className="px-4 py-2 text-left">Action</th>
                                                <th className="px-4 py-2 text-center">
                                                    <Image src="/assets/images/svg/dropdown.svg" alt="dropdown" width={20} height={20} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData.map((row) => (
                                                <tr
                                                    key={row.id}
                                                    onClick={() => setActiveRowId(row.id)}
                                                    className={`transition duration-300 ease-in-out cursor-pointer ${row.id === activeRowId ? 'bg-[#CD0CA7]/20' : 'bg-[#CD0CA714]/10'
                                                        } hover:bg-[#CD0CA7]/10 active:bg-[#CD0CA7]/20 `}
                                                >
                                                    <td className="px-4 py-3">{row.id}</td>
                                                    <td className="px-4 py-3">{row.country}</td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded font-medium text-white ${row.offer === 'CD' ? 'bg-red-600' : 'bg-green-600'
                                                                }`}
                                                        >
                                                            {row.offer}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">{row.team}</td>
                                                    <td className="px-4 py-3">{row.appId}</td>
                                                    <td className="px-4 py-3 text-black hover:underline cursor-pointer flex gap-1">
                                                        Manage <Image src="/assets/images/svg/manage-arrow.svg" alt="arrow" width={16} height={16} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const updated = data.filter((item) => item.id !== row.id);
                                                                setData(updated);
                                                                setActiveRowId(null);
                                                            }}
                                                        >
                                                            <Image src="/assets/images/svg/delete.svg" alt="delete" width={20} height={20} className='cursor-pointer' />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </main>
                            <div className="flex justify-end items-center mt-4 gap-2 text-sm">
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const page = i + 1;

                                    const isStart = page <= 3;
                                    const isEnd = page > totalPages - 1;
                                    const isCurrent = page === currentPage;
                                    const isAroundCurrent = Math.abs(currentPage - page) <= 1;

                                    const shouldRender =
                                        isStart || isEnd || isCurrent || isAroundCurrent;

                                    if (shouldRender) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-1 rounded ${isCurrent ? 'bg-[#4F02FE] text-white' : 'bg-white'}`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    }

                                    // Add ellipsis (...) only once where needed
                                    if (
                                        (page === 4 && currentPage > 5) ||
                                        (page === totalPages - 1 && currentPage < totalPages - 3)
                                    ) {
                                        return (
                                            <span key={`ellipsis-${page}`} className="px-2">
                                                ...
                                            </span>
                                        );
                                    }

                                    return null;
                                })}

                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;