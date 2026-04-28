import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Todo from './Todo'

describe('Todo Component', () => {
  const mockDelete = vi.fn()
  const mockComplete = vi.fn()

  const todoDone = { id: 1, text: 'Buy milk', done: true }
  const todoNotDone = { id: 2, text: 'Walk dog', done: false }

  it('renders a completed todo', () => {
    render(<Todo todo={todoDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    expect(screen.getByText('This todo is done')).not.toBeNull()
    expect(screen.getByText('Buy milk')).not.toBeNull()
  })

  it('renders a not completed todo', () => {
    render(<Todo todo={todoNotDone} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    expect(screen.getByText('This todo is not done')).not.toBeNull()
    expect(screen.getByText('Walk dog')).not.toBeNull()
  })

  it('calls deleteTodo when delete button clicked', () => {
    render(<Todo todo={todoDone} onClickDelete={() => mockDelete(todoDone)} onClickComplete={() => mockComplete(todoDone)} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(todoDone)
  })

  it('calls completeTodo when set as done clicked', () => {
    render(<Todo todo={todoNotDone} onClickDelete={() => mockDelete(todoNotDone)} onClickComplete={() => mockComplete(todoNotDone)} />)
    fireEvent.click(screen.getByText('Set as done'))
    expect(mockComplete).toHaveBeenCalledWith(todoNotDone)
  })
})