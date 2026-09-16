import { Flex, Skeleton } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function LoadingState() {
	const isMobile = useIsMobile();

	return (
		<Flex vertical gap={24} style={{ padding: isMobile ? 12 : 24 }}>
			<Skeleton active paragraph={{ rows: 2 }} title={{ width: "40%" }} />
			<Skeleton.Node active style={{ width: "100%", height: 240 }} />
			<Skeleton active paragraph={{ rows: 4 }} title={false} />
		</Flex>
	);
}
