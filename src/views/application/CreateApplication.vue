<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { showNotify } from 'vant'
    import { base64ToFile } from '@/utils/ocrUtil'
    import { useUserStore } from '@/store'
    import { storeToRefs } from 'pinia'
    import { putFile } from '@/utils/ossUtil'
    import { handleSubmitApplication } from '@/api/application'
    
    const router = useRouter()
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const applicationList = [
        {
            text: '入住申请',
            value: 0
        },
        {
            text: '调宿申请',
            value: 1
        },
        {
            text: '退宿申请',
            value: 2
        }
    ]
    
    const showPicker = ref(false)
    
    const applicationDto = ref({
        type: 0,
        fileUrl: ''
    })
    
    const applicationVo = ref({
        type: '',
        fileUrl: ''
    })
    
    const onConfirm = async ({selectedValues}) => {
        showPicker.value = false
        applicationDto.value.type = selectedValues[0]
        applicationVo.value.type = applicationList[selectedValues[0]].text
    }
    
    onMounted(() => {
        showNotify({
            type: 'warning',
            message: '请确认您没有进行中的申请'
        })
    })
    
    const fileList = ref([])
    
    const filePreCheck = (file) => {
        // 大于10M则禁止识别
        if (file.size > 20 * 1024 * 1024) {
            showNotify({type: 'danger', message: '材料大小不能超过20M'});
            return false
        } else if (
            !file.name.endsWith('.pdf') &&
            !file.name.endsWith('.doc') &&
            !file.name.endsWith('.docx')
        ) {
            showNotify({type: 'danger', message: '文件格式不正确,请使用PDF或WORD'});
            return false
        }
        return true
    }
    
    const onSubmit = async () => {
        try {
            // 上传文件
            if (fileList.value[0] === undefined) {
                showNotify({
                    type: 'danger',
                    message: '请上传您的申请材料'
                })
                return
            }
            
            let objectDate = new Date();
            let day = objectDate.getDate();
            let month = objectDate.getMonth() + 1;
            let year = objectDate.getFullYear();
            
            const file = base64ToFile(fileList.value[0].content,
                currentUser.value.name + "_" + applicationVo.value.type +
                // 拼接日期
                + "_" + `${year}-${month}-${day}` +
                fileList.value[0].file.name.substring(
                    fileList.value[0].file.name.lastIndexOf('.'))
            )
            const result = await putFile(
                `apartment/user/application/${year}/${month}/`,
                file.name, file)
            if (result.url !== undefined){
                applicationDto.value.fileUrl = result.url
                applicationDto.value.type =
                    applicationList.find(
                        item => applicationVo.value.type === item.text).value
                const data = await handleSubmitApplication(applicationDto.value)
                if (data !== null && data.code === 2000) {
                    showNotify({
                        type: 'success',
                        message: '申请提交成功'
                    })
                    await router.push('/main/application/application-list')
                } if (data !== null) {
                    showNotify({
                        type: 'danger',
                        message: `申请提交失败,${data.msg}`
                    })
                } else {
                    showNotify({
                        type: 'danger',
                        message: '申请提交失败,请重试'
                    })
                }
            } else {
                showNotify({
                    type: 'danger',
                    message: '证明文件上传失败,请重试'
                })
            }
        } catch (e) {
            showNotify({
                type: 'danger',
                message: '未知异常,申请提交失败'
            })
        }
    }
</script>

<template>
    <div class="create-application-form">
        <van-nav-bar
            title="新增申请信息"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-form @submit="onSubmit()">
            <van-cell-group inset style="margin-top:5%;">
                <van-field
                    v-model="applicationVo.type"
                    is-link
                    readonly
                    label="申请类型"
                    placeholder="请选择您的申请类型"
                    @click="showPicker = true"
                    :rules="[{ required: true, message: '请选择您所属的单位' }]"
                />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker
                        :columns="applicationList"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                    />
                </van-popup>
                <van-uploader class="file-uploader"
                              :before-read="filePreCheck"
                              v-model="fileList"
                              reupload max-count="1"
                >
                    <van-button plain block type="primary" size="small">
                        请选择您的申请材料
                    </van-button>
                </van-uploader>
            </van-cell-group>
            <div class="submit-application-btn">
                <van-button plain block type="primary" native-type="submit">
                    提交申请
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
    .create-application-form{
        width: 100%;
        height: 100%;
        text-align: center;
        .file-uploader{
            margin: 5% auto;
        }
        .submit-application-btn {
            display: flex;
            justify-content: space-around;
            margin: 5% auto 5%;
            
            .van-button {
                width: 40%;
            }
        }
    }
</style>
