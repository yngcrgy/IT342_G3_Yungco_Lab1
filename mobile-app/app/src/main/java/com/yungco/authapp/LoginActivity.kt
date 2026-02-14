package com.yungco.authapp

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<EditText>(R.id.etLoginEmail)
        val etPassword = findViewById<EditText>(R.id.etLoginPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        btnLogin.setOnClickListener {
            val loginRequest = LoginRequest(
                etEmail.text.toString().trim(),
                etPassword.text.toString().trim()
            )

            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.instance.loginUser(loginRequest)

                    if (response.isSuccessful && response.body() != null) {
                        // 1. Capture the JWT Token
                        val jwt = response.body()!!.accessToken

                        // 2. Save it securely in SharedPreferences
                        saveToken(jwt)

                        Toast.makeText(this@LoginActivity, "Login Successful!", Toast.LENGTH_SHORT).show()

                        // 3. Navigate to the Protected Dashboard
                        val intent = Intent(this@LoginActivity, DashboardActivity::class.java)
                        startActivity(intent)
                        finish() // Close login so they can't 'back' into it
                    } else {
                        Toast.makeText(this@LoginActivity, "Invalid Credentials", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@LoginActivity, "Connection Error", Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun saveToken(token: String) {
        val sharedPref = getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        with(sharedPref.edit()) {
            putString("jwt_token", token)
            apply()
        }
    }
}