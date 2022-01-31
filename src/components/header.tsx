import React, { useContext } from "react";
import Link from 'next/link'
import { AuthContext } from "../context/AuthContext";
import { signOut } from "../utils/auth";
import styles from '../styles/Header.module.scss'
import { AiOutlineHome } from "react-icons/ai"
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { user } = useContext(AuthContext);

  const onClickSignOut = ():void => {
    signOut();
  }

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <a>
            <AiOutlineHome color={'#fff'} size={30}/>
          </a>
        </Link>
      </div>
      <div className={styles.header__right}>
        <Link href="/post">
          <a>
            <MdOutlinePostAdd color={'#fff'} size={30}/>
          </a>
        </Link>
        <div className={styles.header__right__logout}>
          <a onClick={onClickSignOut}>
            <FiLogOut color={'#fff'} size={30}/>
          </a>
        </div>
        <div className={styles.header__right__user}>
          <Link href="/mypage">
            <a>
              {user && <span>{user.name}</span>}
              <BsPersonCircle color={'#fff'} size={30}/>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
