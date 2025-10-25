package com.example.ecommerce.services.impl;

import com.example.ecommerce.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    final private JavaMailSender mailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void sendVerificationOtpEmail(String userEmail, String subject, String text) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "utf-8");

            messageHelper.setSubject(subject);
            messageHelper.setText(text);
            messageHelper.setTo(userEmail);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new MailSendException("Failed to send email");
        }
    }
}
