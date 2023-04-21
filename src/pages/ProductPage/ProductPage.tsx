import { FC, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Spin, Skeleton, Button, message } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGoods, getGoodsLoadStatus, goodActions, cartActions, getCartGoods, getIsAuth } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { Good } from "src/types/general";
import { api } from "src/api/api";
import css from "./productPage.module.css";

export const ProductPage: FC = () => {
    const loadStatus = useSelector(getGoodsLoadStatus);
    const isAuth = useSelector(getIsAuth)
    const navigate = useNavigate();
    const { ids } = useParams();
    const dispatch = useAppDispatch();
    const goods = useSelector(getGoods);
    const cartGoods = useSelector(getCartGoods);
    const [count, setCount] = useState<number>(1);
    const [currentGoods, setCurrentGoods] = useState<Good | null>();
    useEffect(() => {
        if (!currentGoods) {
            dispatch(goodActions.serverRequest({ ids }))
        }
    }, [ids]);
    useEffect(() => {
        if (goods.length > 0) {
            setCurrentGoods(goods[0]);
        }
    }, [goods]);

    const getCart = () => dispatch(cartActions.serverRequest());

    const countGoodsInCart = cartGoods.find(good => good.id === ids)?.count ?? 0;
    const addToCarts = () => {
        count > 0 && api.addToCart(
            {
                good: { ...goods[0], price: String(+goods[0].price * count) },
                count: countGoodsInCart + count, id: goods[0].id
            }).then(getCart);
    }

    if (loadStatus === "ERROR" || loadStatus === "UNKNOWN") {
        return (
            <Content>
                <p>Продукт не найден, <Link to="" onClick={() => navigate(-1)}>вернуться назад</Link></p>
            </Content>
        )
    }
    return (
        <Content className="content">
            <div className={css.product}>
                <Skeleton.Node className={css.imgPlug} active={true}>
                    <img className={css.productImg} src="https://source.unsplash.com/featured/400x600?product" alt="product image" />
                </Skeleton.Node>
                {loadStatus === "LOADING" ? <div className="loading"><Spin tip="Загрузка" size="large"></Spin></div> :
                    <div className="info">
                        <h3>{currentGoods?.label}</h3>
                        <p>{currentGoods?.description}</p>
                        <p>{currentGoods?.price}$</p>
                        <Button onClick={() => {
                            if (isAuth) {
                                addToCarts();
                                setCount(1);
                                message.open({
                                    type: "success",
                                    content: "Продукт добавлен в корзину"
                                });
                            } else {
                                message.open({ type: "error", content: "Только для зарегистрированных пользователей" });
                            }
                        }} icon={<ShoppingCartOutlined />} size="large">Добавить в корзину</Button>
                        <p>Количество: {count}</p>
                        <Button className={css.increaseBtn} onClick={() => setCount((prevCount) => prevCount> 1 ? prevCount - 1 : prevCount)}>-</Button>
                        <Button onClick={() => setCount((prevCount) =>  prevCount + 1 )}>+</Button>
                    </div>}
            </div>
        </Content>
    )
}