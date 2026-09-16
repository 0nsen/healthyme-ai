import { Empty, Flex } from "antd";

export default function EmptyState() {
	return (
		<Flex
			justify="center"
			align="center"
			style={{ height: "100%", minHeight: 400 }}
		>
			<Empty description="Fill in your details to get your personalized health plan." />
		</Flex>
	);
}
