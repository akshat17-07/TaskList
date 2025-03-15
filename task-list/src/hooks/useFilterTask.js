import { useState } from "react";

function useFilterTask() {
    const [completedFilter, setCompletedFilter] = useState(0); // 0 = all, 1 = completed, 2 = to do
    const [searchFilter, setSearchFilter] = useState("");

    function filter(search, completed){
        setCompletedFilter(completed)
        setSearchFilter(search)
        console.log(completed)
        console.log(search)
    }

    return { completedFilter, setCompletedFilter, searchFilter, setSearchFilter, filter };
}

export default useFilterTask;
