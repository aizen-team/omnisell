export interface LayoutProps {
    children: React.ReactNode;
}

export interface AppResponse<T> {
    data?: T;
    message?: string;
    status?: number;
}

export interface AppState {}
