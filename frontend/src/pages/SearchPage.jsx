import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import WatchPage from '../components/WatchPage';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    return (
        <div className="min-h-screen">
            <WatchPage searchQuery={query} />
        </div>
    );
};

export default SearchPage;
