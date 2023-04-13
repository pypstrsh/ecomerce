import { FC } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined, WhatsAppOutlined, } from "@ant-design/icons";
import css from "./footer.module.css";

export const Footer: FC = () => {
    return (
        <Layout.Footer className={css.footer}>
                    <Typography.Paragraph className={css.footerInfo}>Следите за акциями и новостями</Typography.Paragraph>
                    <ul className={css.socialList}>
                        <li><InstagramOutlined /></li>
                        <li><FacebookOutlined /></li>
                        <li><YoutubeOutlined /></li>
                    </ul>
        </Layout.Footer>
    )
}