// import { ObjectId } from 'mongodb'
import { create } from 'zustand'

interface Message {
  _id: any
  content: string
  senderId: any
  recipientId?: any
  channelId?: any
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
