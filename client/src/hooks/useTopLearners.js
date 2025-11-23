import {
  useGetTopLearnersOfMonthQuery,
  useGetTopLearnersOfWeekQuery,
} from "@/features/api/learningFormApi";

const useTopLearners = () => {
  const {
    data: monthData,
    isLoading: isMonthLoading,
    error: monthError,
  } = useGetTopLearnersOfMonthQuery();
  const {
    data: weekData,
    isLoading: isWeekLoading,
    error: weekError,
  } = useGetTopLearnersOfWeekQuery();

  return {
    topLearnersOfMonth: monthData?.topLearners || [],
    topLearnersOfWeek: weekData?.topLearners || [],
    isLoading: isMonthLoading || isWeekLoading,
    error: monthError || weekError,
  };
};

export default useTopLearners;
