package com.yungco.authapp

import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Initialize Views
        val etUsername = findViewById<EditText>(R.id.etUsername)
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val tvLoginLink = findViewById<TextView>(R.id.tvLoginLink)

        // 2. Register Button Logic
        btnRegister.setOnClickListener {
            val userRequest = RegisterRequest(
                etUsername.text.toString().trim(),
                etEmail.text.toString().trim(),
                etPassword.text.toString().trim()
            )

            // Make the API call in a background thread
            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.instance.registerUser(userRequest)
                    if (response.isSuccessful) {
                        Toast.makeText(this@MainActivity, "User Registered Successfully!", Toast.LENGTH_SHORT).show()
                        // Next step: Navigate to Login screen
                    } else {
                        Toast.makeText(this@MainActivity, "Registration Failed: ${response.code()}", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@MainActivity, "Connection Error: Check if Backend is running", Toast.LENGTH_LONG).show()
                }
            }
        }

        // 3. Link to Login Screen
        tvLoginLink.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
    }
}