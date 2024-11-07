import { ObjectId } from 'mongodb'
import { create } from 'zustand'

interface Message {
  _id: ObjectId
  content: string
  senderId: ObjectId
  recipientId?: ObjectId
  channelId?: ObjectId
  isDirectMessage: boolean
}

interface MessageState {
  messages: Message[]
  addMessage: (messages: Message) => void
  setMessages: (messages: Message[]) => void
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) => set({ messages }),
}))
