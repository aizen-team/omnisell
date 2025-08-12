export interface LayoutProps {
    children: React.ReactNode;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export interface AppResponse<T> {
    data?: T;
    message?: string;
    status?: number;
}

export interface AppState {
    loadingRequest: Record<string, boolean>;
}
