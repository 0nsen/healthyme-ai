import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;

export const generatePdfFromElement = async (
	element: HTMLElement,
	filename: string,
): Promise<void> => {
	const canvas = await html2canvas(element, {
		scale: 2,
		useCORS: true,
		backgroundColor: "#ffffff",
	});

	const imgData = canvas.toDataURL("image/png");

	const imgWidthMm = A4_WIDTH_MM;
	const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

	const pdf = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: [imgWidthMm, imgHeightMm],
	});

	pdf.addImage(imgData, "PNG", 0, 0, imgWidthMm, imgHeightMm);

	pdf.save(filename);
};
