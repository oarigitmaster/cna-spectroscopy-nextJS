import { serviceContent } from "@/app/data/services";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
export default function LibsPage() { return <ServiceDetailPage content={serviceContent.libs} />; }
