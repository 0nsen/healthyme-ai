import { Button, Col, Flex, Row, message } from "antd";
import { useRef, useState } from "react";
import type {
	HealthReport,
	HealthReportHeaderInfo,
} from "../../models/health-report";
import { generatePdfFromElement } from "../../utils/generate-pdf";
import { useIsMobile } from "../../hooks/useIsMobile";
import HealthReportSummaryCard from "../molecules/HealthReportSummaryCard";
import HealthReportTimelineCard from "../molecules/HealthReportTimelineCard";
import HealthReportWeightProgressChart from "./HealthReportWeightProgressChart";
import HealthReportExerciseCalendarTable from "./HealthReportExerciseCalendarTable";
import HealthReportPercentagePieChart from "./HealthReportPercentagePieChart";
import HealthReportActivityChart from "./HealthReportActivityChart";

interface ReportStateProps {
	report: HealthReport;
	headerInfo: HealthReportHeaderInfo;
}

export default function ReportState({ report, headerInfo }: ReportStateProps) {
	const {
		summary,
		exerciseCalendar,
		nutritionInsights,
		activityComposition,
		bodyComposition,
		weightProgress,
		timeline,
	} = report;

	const isMobile = useIsMobile();

	const reportRef = useRef<HTMLDivElement>(null);
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownloadPdf = async () => {
		if (!reportRef.current) return;
		setIsDownloading(true);
		try {
			const slug = headerInfo.name
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, "");
			const dateStr = new Date().toISOString().slice(0, 10);
			await generatePdfFromElement(
				reportRef.current,
				`health-report-${slug}-${dateStr}.pdf`,
			);
		} catch {
			message.error("Failed to generate PDF. Please try again.");
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<Flex vertical gap={0}>
			<Flex
				justify="end"
				style={{ padding: isMobile ? "12px 12px 0 12px" : "24px 24px 0 24px" }}
			>
				<Button
					data-html2canvas-ignore
					loading={isDownloading}
					onClick={handleDownloadPdf}
				>
					Download PDF
				</Button>
			</Flex>

			<div ref={reportRef} style={{ padding: isMobile ? 12 : 24 }}>
				<Flex vertical gap={24}>
					<HealthReportSummaryCard headerInfo={headerInfo} summary={summary} />

					<HealthReportTimelineCard timeline={timeline} />

					<HealthReportWeightProgressChart
						weightProgress={weightProgress}
						goalWeight={headerInfo.weightGoal}
					/>

					<HealthReportExerciseCalendarTable
						exerciseCalendar={exerciseCalendar}
					/>

					<Row gutter={[16, 16]}>
						<Col xs={24} md={12}>
							<HealthReportPercentagePieChart
								title="Nutrition"
								data={nutritionInsights.macros}
							/>
						</Col>
						<Col xs={24} md={12}>
							<HealthReportActivityChart
								activityComposition={activityComposition}
							/>
						</Col>
					</Row>

					<HealthReportPercentagePieChart
						title="Body Composition"
						data={bodyComposition}
						color={["#8c8c8c", "#bfbfbf", "#d9d9d9", "#f0f0f0"]}
					/>
				</Flex>
			</div>
		</Flex>
	);
}
