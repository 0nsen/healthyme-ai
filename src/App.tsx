import { Col, Flex, Row } from "antd";
import type { CSSProperties } from "react";
import HealthForm from "./components/organisms/HealthForm";
import HealthReport from "./components/organisms/HealthReport";
import { useIsMobile } from "./hooks/useIsMobile";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { generateHealthReport } from "./store/health-report-slice";

function App() {
	const dispatch = useAppDispatch();
	const { status, report, headerInfo, errorMessage, lastSubmittedValues } =
		useAppSelector((state) => state.healthReport);

	const handleRetry = () => {
		if (lastSubmittedValues) {
			dispatch(generateHealthReport(lastSubmittedValues));
		}
	};

	const isMobile = useIsMobile();
	const pagePadding = isMobile ? 8 : 24;

	const cardStyle: CSSProperties = {
		background: "#fff",
		borderRadius: 12,
		padding: isMobile ? 12 : 24,
		boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
		flex: 1,
	};

	return (
		<Flex
			component="main"
			justify="center"
			style={{
				minHeight: `calc(100vh - ${pagePadding * 2}px)`,
				background: "#f5f5f5",
				padding: pagePadding,
			}}
		>
			<Row
				align="stretch"
				gutter={[24, 24]}
				style={{ width: "100%", maxWidth: 1280 }}
			>
				<Col
					xs={24}
					lg={10}
					xl={8}
					style={{
						alignSelf: "start",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div style={cardStyle}>
						<HealthForm />
					</div>
				</Col>
				<Col
					xs={24}
					lg={14}
					xl={16}
					style={{ display: "flex", flexDirection: "column" }}
				>
					<div style={{ ...cardStyle, padding: 0 }}>
						<HealthReport
							status={status}
							report={report}
							headerInfo={headerInfo}
							errorMessage={errorMessage}
							onRetry={handleRetry}
						/>
					</div>
				</Col>
			</Row>
		</Flex>
	);
}

export default App;
