package com.yungco.authapp

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    // 10.0.2.2 is how the emulator sees your computer's localhost
    private const val BASE_URL = "http://10.0.2.2:8080/"

    val instance: AuthService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        retrofit.create(AuthService::class.java)
    }
}