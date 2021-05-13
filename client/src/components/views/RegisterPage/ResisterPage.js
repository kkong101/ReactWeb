import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const ResisterPage = (props) => {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if(Password !== ConfirmPassword) {
            return alert("동일한 비밀번호를 입력하세요.")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response=> {
                if(response.payload.success) {
                    alert("회원가입을 성공하였습니다.");
                    props.history.push("/login");
                } else {
                    alert("회원가입을 실패하였습니다.");
                }
            })
    }



    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br/>
                <button>회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(ResisterPage)