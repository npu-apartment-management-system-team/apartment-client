<script setup>
    import { onMounted, ref } from 'vue'
    import { closeToast, showLoadingToast, showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    import { validatorCode, validatorPhone, validatorRegisterCode } from "@/utils/validatorUtil";
    import { useUserStore } from "@/store";
    import { storeToRefs } from "pinia";
    import { base64ToFile, scanIdCard } from "@/utils/ocrUtil";
    import { putFile } from "@/utils/ossUtil";
    import axios from "@/api";
    import { handleGetPersonalInfo } from "@/api/common";
    
    const router = useRouter()
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const reviseUserDto = ref({
        username: '',
        departmentId: currentUser.value.departmentId,
        name: currentUser.value.name,
        personalId: currentUser.value.personalId,
        personalCardUrl: currentUser.value.personalCardUrl,
        faceUrl: currentUser.value.faceUrl,
        email: currentUser.value.email,
        sex: currentUser.value.sex,
        isCadre: currentUser.value.isCadre
    })
    
    let oldFaceUrl = ''
    
    const sendSmsEnabled = ref(true)
    
    const confirmSmsDto = ref({
        phone: '',
        code: ''
    })
    
    const smsLoadingText = ref('')
    
    const sendSms = async () => {
        if (!validatorPhone(reviseUserDto.value.username)) {
            showNotify({type: 'danger', message: '手机号格式不正确'});
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码发送中'
        })
        const sendSmsDto = {
            'phone': reviseUserDto.value.username
        }
        try {
            const {data} = await axios.post('/api/auth/sendsms', sendSmsDto)
            if (data.code !== null && data.code === 2000) {
                showNotify({type: 'success', message: '验证码已发送'});
                //在loadingText中展示60秒倒数
                smsLoadingText.value = '300s'
                sendSmsEnabled.value = false
                let time = 300
                const timer = setInterval(() => {
                    time--
                    smsLoadingText.value = time + 's'
                    if (time === 0) {
                        clearInterval(timer)
                        sendSmsEnabled.value = true
                    }
                }, 1000)
            } else {
                showNotify({type: 'danger', message: `验证码发送失败,${data.msg},请重试`});
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    const checkSmsDisabled = ref(false)
    
    const confirmSms = async () => {
        confirmSmsDto.value.phone = reviseUserDto.value.username
        if (!validatorCode(confirmSmsDto.value.code) ||
            !validatorPhone(confirmSmsDto.value.phone)
        ) {
            showNotify({type: 'danger', message: '格式不正确'});
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码验证中'
        })
        try {
            const {data} = await axios.post("/api/auth/checksms", confirmSmsDto.value)
            if (data.code !== null && data.code === 2000) {
                showNotify({type: 'success', message: '验证码验证成功'});
                // 禁止重复提交
                checkSmsDisabled.value = true
            } else {
                showNotify({type: 'danger', message: `验证码验证失败,${data.msg},请重试`});
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    const confirmMailDto = ref({
        email: '',
        code: ''
    })
    
    const fileList = ref([])
    
    const checkMailDisabled = ref(false)
    
    const sendMailEnabled = ref(true)
    
    const mailLoadingText = ref('')
    
    const sendMail = async () => {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(reviseUserDto.value.email)) {
            showNotify({type: 'danger', message: '邮箱格式不正确'});
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码发送中'
        })
        const sendMailDto = {
            'email': reviseUserDto.value.email
        }
        try {
            const {data} = await axios.post('/api/auth/sendmail', sendMailDto)
            if (data.code !== null && data.code === 2000) {
                showNotify({type: 'success', message: '验证码已发送'});
                //在loadingText中展示60秒倒数
                mailLoadingText.value = '300s'
                sendMailEnabled.value = false
                let time = 300
                const timer = setInterval(() => {
                    time--
                    mailLoadingText.value = time + 's'
                    if (time === 0) {
                        clearInterval(timer)
                        sendMailEnabled.value = false
                    }
                }, 1000)
            } else {
                showNotify({type: 'danger', message: `验证码发送失败,${data.msg},请重试`});
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    const confirmMail = async () => {
        confirmMailDto.value.email = reviseUserDto.value.email
        if (!validatorCode(confirmMailDto.value.code) ||
            /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(confirmMailDto.value.code)) {
            showNotify({type: 'danger', message: '格式不正确'});
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求邮箱验证中'
        })
        try {
            const {data} = await axios.post("/api/auth/checkmail", confirmMailDto.value)
            if (data.code !== null && data.code === 2000) {
                showNotify({type: 'success', message: '邮箱验证成功'});
                // 禁止重复提交
                checkMailDisabled.value = true
            } else {
                showNotify({type: 'danger', message: `邮箱验证失败,${data.msg},请重试`});
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    const picPreCheck = (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({type: 'danger', message: '文件大小不能超过10M'});
            return false
        } else if (!/image\/(png|jpg|jpeg|JPG|PNG)/.test(file.file.type)) {
            showNotify({type: 'danger', message: '文件格式不正确'});
            return false
        }
        return true
    }
    
    let sex = ref('')
    
    const resolveIdCardFront = async (file) => {
        if (!picPreCheck(file)) {
            return
        }
        // 开始转圈
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在识别身份证'
        })
        try {
            const {data} = await scanIdCard(file)
            if (data.code === 2000) {
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if (resolveResult.data.face !== null) {
                    const face = resolveResult.data.face
                    // 正面
                    if (face.warning.isCopy !== 0 || face.warning.isReshoot !== 0) {
                        showNotify({type: 'danger', message: '识别到翻拍或复制。请识别原件身份证'});
                        return
                    }
                    reviseUserDto.value.name = face.data.name
                    reviseUserDto.value.personalId = face.data.idNumber
                    reviseUserDto.value.sex = face.data.sex === '男' ? 0 : 1
                    sex.value = face.data.sex
                    // 上传身份证照片到OSS
                    closeToast()
                    showLoadingToast({
                        duration: 0,
                        forbidClick: true,
                        message: '正在上传身份证照片到后台存储'
                    })
                    const personalIdCard = base64ToFile(file.content, file.file.name)
                    const result = await putFile(
                        'apartment/user/idcard/',
                        // 拼接文件后缀
                        reviseUserDto.value.name + '_' + personalIdCard.name,
                        personalIdCard
                    )
                    reviseUserDto.value.personalCardUrl = result.url
                } else {
                    showNotify({type: 'danger', message: '身份证识别失败,请重试'});
                }
            } else {
                showNotify({type: 'danger', message: `身份证识别失败,${data.msg},请重试`});
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    const role = ref([])
    
    const departmentSimpleList = ref([])
    
    const departmentNameList = []
    
    const showPicker = ref(false)
    
    const onConfirm = ({selectedValues}) => {
        reviseUserDto.value.departmentId =
            departmentNameList.find(item => item.value === selectedValues[0]).text
        showPicker.value = false
    }
    
    const getDepartmentSimpleList = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在获取部门列表'
        })
        try {
            const {data} = await axios.get('/api/management/department/list')
            if (data.code === 2000) {
                departmentSimpleList.value = data.result.list
                departmentSimpleList.value.forEach((item) => {
                    departmentNameList.push({
                        text: item.name,
                        value: item.id
                    })
                })
            } else {
                showNotify({type: 'danger', message: data.message})
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`})
        } finally {
            closeToast()
        }
    }
    
    const uploadAvatar = async (file) => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '人脸照片上传中'
        })
        try {
            const personalPic = base64ToFile(file.content, file.file.name)
            // 如果不是jpg则直接退出
            if (!personalPic.name.endsWith('jpg')) {
                showNotify({type: 'danger', message: '人脸照片格式不正确'})
                return false
            }
            const result = await putFile(
                'apartment/user/face/',
                reviseUserDto.value.name + '_' + personalPic.name, personalPic)
            if (result.url !== undefined) {
                reviseUserDto.value.faceUrl = result.url
            }
            return true
        } catch (e) {
            showNotify({type: 'danger', message: `人脸照片上传失败,请重试`})
        } finally {
            closeToast()
        }
        return false
    }
    
    const getUserBasic = async () => {
        const data = await handleGetPersonalInfo()
        if (data !== null && data.code === 2000) {
            userStore.$patch((state) => {
                state.currentUser = data.result
            })
        } else if (data !== null) {
            showNotify({type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试`});
        } else {
            showNotify({type: 'danger', message: `首页初始化失败,请刷新页面重试`});
        }
    }
    
    const onSubmit = async () => {
        try {
            if (!checkSmsDisabled.value) {
                showNotify({
                    type: 'danger',
                    message: '请先验证手机号'
                })
            }
            if (reviseUserDto.value.faceUrl !== oldFaceUrl) {
                // 人脸数据发生变化 重新上传
                showLoadingToast({
                    duration: 0,
                    forbidClick: true,
                    message: '检测到人脸数据发生变化,正在上传'
                })
                const result = await uploadAvatar(fileList.value[0])
                if (!result) {
                    return
                }
                
                closeToast()
                showLoadingToast({
                    duration: 0,
                    forbidClick: true,
                    message: '人脸数据上传成功,正在进行人证核验'
                })
                // 调用人证核身接口进行预校验
                const faceRecognitionDto = {
                    faceUrl: reviseUserDto.value.faceUrl,
                    name: reviseUserDto.value.name,
                    personalId: reviseUserDto.value.personalId
                }
                closeToast()
                showLoadingToast({
                    duration: 0,
                    forbidClick: true,
                    message: '人证核验成功,正在进行上传修改信息'
                })
                const resp = await axios.post('/api/auth/faceVerification', faceRecognitionDto)
                if (!resp.data.code === 2000) {
                    closeToast()
                    showNotify({
                        type: 'danger',
                        message: `人证核验失败,${resp.data.msg},请重试`
                    })
                    return
                }
            }
            
            if (role.value.indexOf('isCadre') !== -1) {
                reviseUserDto.value.isCadre = 1
            }
            
            reviseUserDto.value.departmentId =
                departmentSimpleList.value.find(
                    item => item.name === reviseUserDto.value.departmentId
                ).id
            showLoadingToast({
                duration: 0,
                forbidClick: true,
                message: '正在提交修改信息'
            })
            const {data} = await axios
                .put(`/api/user/user/${currentUser.value.id}`,
                    reviseUserDto.value)
            if (data.code === 2000) {
                showNotify({type: 'success', message: '成功修改您的个人信息'})
                await getUserBasic()
                await router.go(0)
            } else {
                showNotify({type: 'danger', message: data.message})
            }
        } catch (e) {
            showNotify({type: 'danger', message: `服务器异常${e},请通知管理员`});
        } finally {
            closeToast();
        }
    }
    
    onMounted(async () => {
        sex.value = currentUser.value.sex === 0 ? '男' : '女'
        await getDepartmentSimpleList()
        fileList.value.push({
            url: currentUser.value.faceUrl,
            isImage: true
        })
        if (currentUser.value.isCadre === 1) {
            role.value.push('isCadre')
        }
        reviseUserDto.value.departmentId =
            departmentSimpleList.value.find(
                item => item.id === currentUser.value.departmentId
            ).name
        oldFaceUrl = currentUser.value.faceUrl
    })
</script>

<template>
    <div class="revise-form">
        <van-nav-bar
            title="修改个人信息"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-form style="margin-top:5%;" @submit="onSubmit()">
            <van-cell-group inset style="padding: 1%;">
                <van-uploader style="width: 60%; margin: 0 auto;"
                              :after-read="resolveIdCardFront">
                    <van-button plain block type="primary" size="small">
                        拍摄您的身份证-正面-以自动填充
                    </van-button>
                </van-uploader>
                <van-field
                    v-model="reviseUserDto.personalId"
                    center
                    disabled
                    clearable
                    label="身份证号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-model="reviseUserDto.name"
                    center
                    disabled
                    clearable
                    label="真实姓名"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-model="sex"
                    center
                    disabled
                    clearable
                    label="性别"
                    placeholder="该位置会被自动填充"
                />
                <van-cell>
                    <van-row class="personCard">
                        <van-col span="8">
                            人脸照片
                        </van-col>
                        <van-col span="16">
                            <van-uploader
                                capture="camera"
                                v-model="fileList"
                                :max-count="1"
                                :max-size="10 * 1024 * 1024"
                            />
                        </van-col>
                    </van-row>
                </van-cell>
                <van-field
                    v-model="reviseUserDto.username"
                    name="手机号"
                    label="手机号"
                    placeholder="请输入手机号"
                    type="tel"
                    clearable
                    :rules="[{ validator: validatorPhone, message: '请输入正确的手机号码' }]"
                    :disabled="checkSmsDisabled"
                />
                <van-field
                    v-model="confirmSmsDto.code"
                    center
                    clearable
                    type="digit"
                    label="短信验证码"
                    placeholder="请输入验证码"
                    :rules="[{ validator: validatorCode, message: '应为4位数字' }]"
                    v-if="!checkSmsDisabled"
                >
                    <template #button>
                        <van-button
                            v-if="sendSmsEnabled"
                            size="small"
                            type="primary"
                            @click="sendSms()"
                            :disabled="checkSmsDisabled"
                        >
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendSmsEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="smsLoadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary" v-if="!checkSmsDisabled"
                            size="small" style="width: 40%; margin: 1% auto" @click="confirmSms()">验证手机号码
                </van-button>
                <van-field
                    v-model="reviseUserDto.email"
                    center
                    clearable
                    label="邮箱"
                    placeholder="请输入邮箱(非强制)"
                    :disabled="checkMailDisabled"
                />
                <van-field
                    v-model="confirmMailDto.code"
                    center
                    clearable
                    type="digit"
                    label="邮箱验证码"
                    placeholder="请输入验证码"
                    :rules="[{ required: false, validator: validatorRegisterCode, message: '应为4位数字' }]"
                    v-if="!checkMailDisabled"
                >
                    <template #button>
                        <van-button
                            v-if="sendMailEnabled"
                            size="small"
                            type="primary"
                            @click="sendMail()">
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendMailEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="mailLoadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary" v-if="!checkMailDisabled"
                            size="small" style="width: 40%; margin: 1% auto"
                            @click="confirmMail()">
                    验证邮箱
                </van-button>
                <van-field
                    v-model="reviseUserDto.departmentId"
                    is-link
                    readonly
                    label="单位"
                    placeholder="请选择您所属的单位"
                    @click="showPicker = true"
                    :rules="[{ required: true, message: '请选择您所属的单位' }]"
                />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker
                        :columns="departmentNameList"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                    />
                </van-popup>
                <van-checkbox-group v-model="role" direction="horizontal" class="checkbox-area">
                    <van-checkbox name="isCadre">我是处级以上干部</van-checkbox>
                </van-checkbox-group>
            </van-cell-group>
            
            <div class="submit-revise-btn">
                <van-button plain block type="primary" native-type="submit">
                    修改个人信息
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
    .revise-form {
        .personCard {
            height: 10%;
            // 纵向居中
            display: flex;
            align-items: center;
            text-align: left;
            
            .avatar-container {
                margin-left: 5px;
            }
        }
        
        .title {
            margin-top: 5%;
        }
        
        width: 100%;
        height: 100%;
        text-align: center;
        
        .checkbox-area {
            display: flex;
            justify-content: space-around;
            margin-top: 5%;
        }
        
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
