<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import { validatorPassword } from '@/utils/validatorUtil'
    import { handleRevisePassword } from '@/api/my'
    import { showNotify } from "vant";
    
    const router = useRouter()
    
    const plainPasswordVo = ref({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const validatorConfirmPassword = (val) => {
        if (plainPasswordVo.value.newPassword === '') {
            return '请先输入新密码'
        } else if (val !== plainPasswordVo.value.newPassword) {
            return '两次输入密码不一致'
        }
        return true
    }
    
    const onSubmit = async () => {
        const passwordDto = {
            oldPassword: plainPasswordVo.value.oldPassword,
            newPassword: plainPasswordVo.value.newPassword
        }
        const data = await handleRevisePassword(passwordDto)
        if (data !== null && data.code === 2000) {
            showNotify({
                type: 'success', message: `修改密码成功`
            })
            plainPasswordVo.value = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        } else if (data !== null) {
            showNotify({
                type: 'danger', message: `修改密码失败,${data.msg},请刷新页面重试`
            })
        } else {
            showNotify({
                type: 'danger', message: `修改密码失败,请刷新页面重试`
            })
        }
    }
</script>

<template>
    <div class="revise-form">
        <van-nav-bar
            title="修改密码"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-form style="margin-top:5%;" @submit="onSubmit()">
            <van-cell-group inset style="padding: 1%;">
                <van-field
                    v-model="plainPasswordVo.oldPassword"
                    name="旧密码"
                    label="旧密码"
                    type="password"
                    placeholder="请输入旧密码"
                    autocomplete="off"
                    clearable
                    :rules="[{ validator: validatorPassword, message: '应为4-16位数字/字母/下划线' }]"
                />
                <van-field
                    v-model="plainPasswordVo.newPassword"
                    name="新密码"
                    label="新密码"
                    type="password"
                    placeholder="请输入新密码"
                    autocomplete="off"
                    clearable
                    :rules="[{ validator: validatorPassword, message: '应为4-16位数字/字母/下划线' }]"
                />
                <van-field
                    v-model="plainPasswordVo.confirmPassword"
                    name="确认新密码"
                    label="确认新密码"
                    type="password"
                    placeholder="请确认新密码"
                    autocomplete="off"
                    clearable
                    :rules="[{ validator: validatorConfirmPassword, message: '应为4-16位数字/字母/下划线' }]"
                />
            </van-cell-group>
            
            <div class="submit-revise-btn">
                <van-button plain block type="primary" native-type="submit">
                    修改密码
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
    .revise-form {
        width: 100%;
        height: 100%;
        text-align: center;
        
        .submit-revise-btn {
            display: flex;
            justify-content: space-around;
            margin: 5% auto 5%;
            
            .van-button {
                width: 40%;
            }
        }
    }
</style>
