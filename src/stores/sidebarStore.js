import { create } from "zustand";


const useDashboardStore=create((set)=>({
    selectedComponent:'blogList',
    setSelectedComponent:(component)=>set({selectedComponent:component}),
}))

export default useDashboardStore;