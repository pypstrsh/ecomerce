import { FC } from "react";
import { Spin } from "antd";

type SpinnerProps = {
    tip: string,
    size?: any
}

export const Spinner: FC<SpinnerProps> = ({ tip, size }) => (
    <div className="loading">
        <Spin tip={tip} size={size} />
    </div>
)