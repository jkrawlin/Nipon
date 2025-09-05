import { 
  collection, 
  getDocs, 
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Notification } from '../types';

export class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'notifications'), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        scheduledDate: doc.data().scheduledDate?.toDate?.() || null,
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as Notification[];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  async markAsRead(id: string): Promise<Notification> {
    try {
      const docRef = doc(db, 'notifications', id);
      await updateDoc(docRef, { isRead: true });
      
      // Return simplified notification for demo
      return { id, isRead: true } as Notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }
}

export const notificationService = new NotificationService();
