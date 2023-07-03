// auth部分使用的缓存
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRegisterDtoStore =
    defineStore('registerDtoCache', () => {
            const registerCache = ref(
                {
                    registerDto: {
                        username: '',
                        password: '',
                        departmentId: '',
                        name: '',
                        personalId: '',
                        personalCardUrl: '',
                        faceUrl: '',
                        email: '',
                        sex: 0, // 男0女1
                        isCadre: 0 // 干部1非干部0
                    },
                    checkSmsDisabled: false,
                    checkMailDisabled: false,
                    checkIdFront: false
                }
            )
            return {registerCache}
        }, {
            persist: {
                storage: sessionStorage,
                paths: ['registerCache'],
                key: "registerCache"
            }
        }
    )
