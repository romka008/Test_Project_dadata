import React, {ErrorInfo, ReactNode, Suspense} from "react";
import {UnexpectedError} from "@components/UnexpectedError/UnexpectedError";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;
        if (hasError) {
            return (
                <Suspense fallback="">
                    <UnexpectedError />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
