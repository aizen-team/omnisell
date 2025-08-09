import { Button } from "@/components/elements";
import { PlusIcon } from "@/components/shared/icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notifications from "./Notifications";
import Actions from "./Actions";
import AccountCenter from "./AccountCenter";
import PageHeader from "./PageHeader";

export default function Header() {
    return (
        <div
            id="header"
            className="hidden lg:flex items-center justify-between bg-white px-6 py-4 shadow-sm"
        >
            <div className="header-container w-full flex items-center justify-between">
                <PageHeader />
                <div className="flex items-center gap-4">
                    <Actions />
                    <Notifications />
                    <AccountCenter />
                </div>
            </div>
        </div>
    );
}
