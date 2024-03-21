import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
  } from "@tanstack/react-query";
  import DashboardService, { Dashboard } from "../service/dashboardService";
  
  export function useDashboards(): UseQueryResult<Dashboard[]> {
    const dashboardService = new DashboardService();
    // console.log("use gren coffee hooks")
    return useQuery({
      queryKey: ["Dashboards"],
      queryFn: () => dashboardService.getAllDashboards(),
    });
  }

  