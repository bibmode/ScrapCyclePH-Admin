import React from "react";

const ProgressBarComponent = ({
  completedCount,
  totalCount,
  cancelledCount,
}) => {
  const validTotalCount =
    totalCount && totalCount > cancelledCount ? totalCount - cancelledCount : 0;
  const percentage =
    validTotalCount > 0
      ? Math.round((completedCount / validTotalCount) * 100)
      : 0;

  return (
    <div className="flex-grow py-3 px-4 flex items-center justify-between border-r">
      <div>
        {completedCount !== null ? completedCount : "Loading..."}/
        {totalCount !== null ? totalCount - cancelledCount : "Loading..."}
      </div>
      <div className="rounded-full h-3 mx-4 w-full bg-gray-200">
        <div
          className="h-full bg-green-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div>{percentage}%</div>
    </div>
  );
};

export default ProgressBarComponent;
