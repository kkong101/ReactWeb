import React,{useRef} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {useForm} from 'react-hook-form';
import { withRouter } from 'react-router-dom';


const RegisterPage = (props) => {

    const {register, watch, handleSubmit, formState: { errors }} = useForm();
    const password = useRef();
    password.current = watch("password", "");
    
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let body = {
            email: data.email,
            name: data.name,
            password: data.password
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
    };
   




    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onSubmit)} >
                <label>Email</label>
                <input name="email" type="email" {...register("email",{ required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && (<p>This email field is required</p>) }
                

                <label>Name</label>
                <input name="name" {...register("name",{ required: true, maxLength: 10 })}/>
                {errors.name && errors.name.type === "required"
                    && <p> This name field is required</p>}
                {errors.name && errors.name.type === "maxLength"
                    && <p> Your input exceed maximum length</p>}
                {console.log(errors.name)}
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                     {...register("password",{ required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required"
                    && <p> This name field is required</p>}
                {errors.password && errors.password.type === "minLength"
                    && <p> Password must have at least 6 characters</p>}

                <label>Password Confirm</label>
                <input
                    type="password"
                    name="password_confirm"
                     {...register("password_confirm", {
                    required: true,
                    validate: value =>
                        value === password.current || "The Passwords do not matched"
                    })}
                />

                {errors.password_confirm && errors.password_confirm.type === "required"
                    && <p> This password confirm field is required</p>}
                {errors.password_confirm && errors.password_confirm.type === "validate"
                    && <p>{errors.password_confirm.message}</p>}

                <input type="submit"
                    style={{ marginTop: '40px' }}
                />
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)