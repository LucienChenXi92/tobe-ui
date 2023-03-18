import { useTranslation } from "react-i18next";
import { Divider, Grid, Hidden, Typography } from "@mui/material";
import { Page } from "../../../components";
import { url } from "inspector";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Page pageTitle={t("about-page.page-main-title")} openLoading={false}>
      <Grid container sx={{ py: 4 }}>
        <Grid item xs={12} sm={8}>
          <Typography
            color={"textSecondary"}
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
          >
            关于 TOBE
          </Typography>

          <Typography color="textSecondary">
            TOBE
            是一个专注于个人积累成长的网站。我们致力于为用户提供一个综合性的个人成长平台，帮助用户提高自我认知、职业技能和人际交往等方面的能力，实现自我价值的最大化。
          </Typography>
          <br />
          <Typography color="textSecondary">
            TOBE
            的理念是“让每个人都成为更好的自己”。我们相信，每个人都有无限的潜力，只需要找到正确的方法和工具来挖掘和发掘。因此，我们提供了各种各样的学习资源和工具，包括学习计划、学习笔记，学习社区和职业发展指南等，帮助用户实现自我提升和成长。
          </Typography>
          <br />
          <Typography color="textSecondary">
            我们的愿景是成为全球领先的个人成长平台，帮助全球数百万用户实现自我发展和提升，创造更加美好的人生。我们坚信，通过持续学习和成长，每个人都可以实现自我梦想和追求，成为更好的自己。
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ px: 4, pt: { xs: 8, sm: 8 } }}>
          <img
            width={"100%"}
            height={"100%"}
            src={
              "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </Grid>
      </Grid>

      <Grid container sx={{ py: 4 }}>
        <Hidden mdDown>
          <Grid item xs={12} sm={4} sx={{ px: 2, pt: 8 }}>
            <img width={"100%"} height={"80%"} src={"/images/lucien.JPG"} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={8}>
          <Typography
            color={"textSecondary"}
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
          >
            关于“我”
          </Typography>
          <Typography color="textSecondary">
            大家好，我是 Lucien Chen，一名90后全栈开发者，同时也是 TOBE
            的创建者。一直以来我都对科技非常感兴趣，特别是对如何将技术来帮助人们优化生活，实现自我成长和进步有着强烈的追求。
          </Typography>
          <br />
          <Typography color="textSecondary">
            大学时主修的是材料专业，在做课题时接触到计算机模拟材料制程工艺，通过
            Python 脚本来寻找最佳的工艺参数，自此开启了计算机编程的新世界。
            毕业后一直从事 IT
            相关工作，我积累了丰富的开发经验和技能，能够熟练地运用多种编程语言和开发工具进行项目开发和管理。
          </Typography>
          <br />
          <Typography color="textSecondary">
            自2019年底，我开始基于 Hexo
            框架来在网上分享自己的经验积累和学习笔记，但是受框架的种种限制，非常影响创作体验。而且
            Hexo 只能用于个人创作，无法让更多人参与进来。 因此，我决定创建 TOBE
            网站，为更多用户提供一个全面性的个人成长平台，帮助他们实现自我价值的最大化。
          </Typography>
          <br />
          <Typography color="textSecondary">
            我希望通过 TOBE
            网站，能够与更多志同道合的人一起分享我的经验和知识，并为他们提供最优质的学习资源和工具，帮助他们成为更好的自己。
          </Typography>
        </Grid>

        <Hidden mdUp>
          <Grid item xs={12} sx={{ p: 4 }}>
            <img width={"100%"} height={"100%"} src={"/images/lucien.JPG"} />
          </Grid>
        </Hidden>
      </Grid>
    </Page>
  );
}
