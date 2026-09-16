import type {
	HealthReport,
	HealthReportHeaderInfo,
	HealthReportStatus,
} from "../../models/health-report";
import EmptyState from "../molecules/EmptyState";
import LoadingState from "../molecules/LoadingState";
import ErrorState from "../molecules/ErrorState";
import ReportState from "./ReportState";

interface HealthReportProps {
	status: HealthReportStatus;
	report?: HealthReport;
	headerInfo?: HealthReportHeaderInfo;
	errorMessage?: string;
	onRetry?: () => void;
}

export default function HealthReport({
	status,
	report,
	headerInfo,
	errorMessage,
	onRetry = () => {},
}: HealthReportProps) {
	let content;
	if (status === "loading") content = <LoadingState />;
	else if (status === "failed")
		content = <ErrorState errorMessage={errorMessage} onRetry={onRetry} />;
	else if (status === "succeeded" && report && headerInfo)
		content = <ReportState report={report} headerInfo={headerInfo} />;
	else content = <EmptyState />;

	return <div style={{ height: "100%" }}>{content}</div>;
}
