import { Button, Result, Typography } from "antd";

const { Paragraph } = Typography;

interface ErrorStateProps {
	errorMessage?: string;
	onRetry: () => void;
}

export default function ErrorState({ errorMessage, onRetry }: ErrorStateProps) {
	return (
		<Result
			status="error"
			title="Something went wrong generating your report"
			subTitle={
				errorMessage && (
					<Paragraph style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
						{errorMessage}
					</Paragraph>
				)
			}
			extra={
				<Button type="primary" onClick={onRetry}>
					Try Again
				</Button>
			}
		/>
	);
}
