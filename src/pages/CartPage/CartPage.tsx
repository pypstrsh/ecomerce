import { FC, useEffect } from "react";
import { Layout } from "antd";
import { cartActions, getCartGoods, getCartGoodsCount, getCartGoodsPrice } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { List, Descriptions, Card, Button } from "antd";
import css from "./cart.module.css";

export const CartPage: FC = () => {
    const dispatch = useAppDispatch();
    const cartGoods = useSelector(getCartGoods);
    const totalPrice = useSelector(getCartGoodsPrice);
    const totalCount = useSelector(getCartGoodsCount);
    useEffect(() => {
        dispatch(cartActions.serverRequest());
    }, []);

    return (
        <Layout.Content className="content">
            <div className={css.cart}>
                <List className={css.cartList} size="small" itemLayout="vertical" dataSource={cartGoods} renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={100}
                                alt="product_img"
                                src={item.good.img}
                            />
                        }
                    >
                        <Descriptions>
                            <Descriptions.Item className={css.info}>{item.good.label}</Descriptions.Item>
                            <Descriptions.Item className={css.info}>{item.good.description}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label="Цена">{item.good.price}$</Descriptions.Item>
                            <Descriptions.Item label="Количество">{item.count}</Descriptions.Item>
                        </Descriptions>
                    </List.Item>
                )}>
                </List>
                <Card className={css.buycard}>
                    <p className={css.info}>Итого: ${totalPrice}</p>
                    <p className={css.info}>Всего товаров: {totalCount}</p>
                    <Button className={css.buyButton}>Купить</Button>
                </Card>
            </div>
        </Layout.Content>
    )
}