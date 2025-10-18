from ortools.sat.python import cp_model

# 表一: 各工種施工團隊數
taiwan_crews = {'water': 3, 'power': 3, 'gas': 1}
local_crews = {'water': 3, 'power': 4, 'gas': 3}

# 表二: 各機台完工目標時間與各工種的施工時間
jobs = [
    {'name': 'EQP_01', 'due_week': 7, 'water': (2, 4), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_02', 'due_week': 8, 'water': (3, 6), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_03', 'due_week': 9, 'water': (2, 4), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_04', 'due_week': 9, 'water': (1, 2), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_05', 'due_week': 10, 'water': (2, 4), 'power': (2, 3), 'gas': (1, 3)},
    {'name': 'EQP_06', 'due_week': 11, 'water': (1, 2), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_07', 'due_week': 11, 'water': (3, 6), 'power': (4, 6), 'gas': (1, 3)},
    {'name': 'EQP_08', 'due_week': 12, 'water': (3, 6), 'power': (2, 3), 'gas': (1, 3)},
    {'name': 'EQP_09', 'due_week': 13, 'water': (3, 6), 'power': (6, 9), 'gas': (1, 3)}
]









def schedule_jobs(jobs, taiwan_crews, local_crews):
    model = cp_model.CpModel()

    # 創建工作和團隊變數
    tasks = {}
    for job in jobs:
        name = job['name']
        tasks[name] = {}
        for task_type in ['water', 'power', 'gas']:
            tasks[name][task_type] = {
                'taiwan': model.NewIntVar(0, job['due_week'], f"{name}_{task_type}_taiwan"),
                'local': model.NewIntVar(0, job['due_week'], f"{name}_{task_type}_local")
            }

    # 限制條件
    for job in jobs:
        name = job['name']
        due_week = job['due_week']

        # 每個工作必須依序完成水、電、氣三個工種
        # 在台灣團隊中"水"工種的開始時間加上其持續時間下限,必須等於"電"工種的開始時間。換句話說,"電"工種必須在"水"工種完成後才能開始。
        # 水工作
        # model.AddMinEquality(
        #     tasks[name]['water']['taiwan'] + job['water'][0],
        #     tasks[name]['water']['local'] + job['water'][1],
        #     tasks[name]['power']['taiwan']
        # )

        # # 电工作
        # model.AddMinEquality(
        #     tasks[name]['power']['taiwan'] + job['power'][0],
        #     tasks[name]['power']['local'] + job['power'][1],
        #     tasks[name]['gas']['taiwan']
        # )

        model.Add(tasks[name]['water']['taiwan'] + job['water'][0] == tasks[name]['power']['taiwan'])
        model.Add(tasks[name]['water']['local'] + job['water'][1] == tasks[name]['power']['local'])
        model.Add(tasks[name]['power']['taiwan'] + job['power'][0] == tasks[name]['gas']['taiwan'])
        model.Add(tasks[name]['power']['local'] + job['power'][1] == tasks[name]['gas']['local'])


        # 每個工作必須在指定週數內完成
        # model.Add(tasks[name]['gas']['taiwan'] + job['gas'][0] <= due_week)
        # model.Add(tasks[name]['gas']['local'] + job['gas'][1] <= due_week)

    # 同一時間只能有一個團隊進行某個工種的工作
    # for task_type in ['water', 'power', 'gas']:
    #   for week in range(1, jobs[-1]['due_week'] + 1):
    #       taiwan_vars = [tasks[name][task_type]['taiwan'] == week for name in tasks]
    #       print(taiwan_vars)
    #       local_vars = [tasks[name][task_type]['local'] == week for name in tasks]
    #       print(local_vars)
    #       model.Add(sum(taiwan_vars) <= taiwan_crews[task_type])
    #       model.Add(sum(local_vars) <= local_crews[task_type])
    
    # 求解
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    # 輸出結果
    if status == cp_model.OPTIMAL:
        for job in jobs:
            name = job['name']
            print(f"{name} water work: Taiwan week {solver.Value(tasks[name]['water']['taiwan'])}, "
                  f"local week {solver.Value(tasks[name]['water']['local'])}")
            print(f"{name} power work: Taiwan week {solver.Value(tasks[name]['power']['taiwan'])}, "
                  f"local week {solver.Value(tasks[name]['power']['local'])}")
            print(f"{name} gas work: Taiwan week {solver.Value(tasks[name]['gas']['taiwan'])}, "
                  f"local week {solver.Value(tasks[name]['gas']['local'])}")
    else:
        print("No solution found.")

# 執行排程
schedule_jobs(jobs, taiwan_crews, local_crews)