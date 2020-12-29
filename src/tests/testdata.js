import faker from 'faker'



export const fakeTodo = {
  todo_name: faker.lorem.words(),
  description: faker.lorem.paragraph(),
}

export const noNameTodo = {
    content: faker.lorem.paragraph()
}

export const realTodoOne = {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph()
}

export const realTodoTwo = {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph()
}
