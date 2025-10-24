import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const emailService = EmailService.getInstance();
    
    if (!emailService.isConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'Le service email n\'est pas configuré. Veuillez vérifier les variables d\'environnement.'
      }, { status: 400 });
    }

    // Envoyer un email de test avec des données fictives
    const testData = {
      customerName: 'Client Test',
      customerPhone: '+225 00 00 00 00',
      neighborhood: 'Quartier Test',
      type: 'TEXT' as const,
      description: 'Ceci est un email de test pour vérifier la configuration.',
      hasPhoto: false,
      requestDate: new Date().toLocaleDateString('fr-FR'),
      requestId: 'test-' + Date.now()
    };

    const result = await emailService.sendEmailWithAttachments(testData);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de test envoyé avec succès! Vérifiez votre boîte de réception.'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Échec de l\'envoi de l\'email de test.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email de test' },
      { status: 500 }
    );
  }
}